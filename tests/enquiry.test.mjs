import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { prepareEnquiry } from '../lib/enquiry.js';

const routeUrl = new URL('../app/api/enquiry/route.js', import.meta.url);
const routeSource = (await readFile(routeUrl, 'utf8'))
  .replace('"../../../lib/enquiry-recipients"', JSON.stringify(new URL('../lib/enquiry-recipients.js', import.meta.url).href))
  .replace('"../../../lib/enquiry"', JSON.stringify(new URL('../lib/enquiry.js', import.meta.url).href));
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(routeSource).toString('base64')}`);
const fields = { name: 'Test Visitor', email: 'visitor@example.com', company: 'Test Company', service: 'SEO and GEO', message: 'Improve qualified traffic', website: 'https://example.com', channel: 'SEO and GEO', goal: 'Review search', firm: 'Test Fund', scope: 'A portfolio-wide partnership', context: 'Support B2B companies' };
const payload = (type = 'strategy') => ({ type, fields, page: '/services/seo' });
const request = (body, origin = 'https://regen.digital') => new Request('https://regen.digital/api/enquiry', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('all enquiry types retain their required fields and source page', () => {
  for (const type of ['contact', 'audit', 'partnership', 'strategy']) {
    const email = prepareEnquiry(payload(type));
    assert.equal(email.reply_to, fields.email);
    assert.match(email.text, /Submitted from: \/services\/seo/);
    assert.match(email.text, /Name: Test Visitor/);
  }
  assert.match(prepareEnquiry(payload('audit')).text, /What they want reviewed: Review search/);
  assert.match(prepareEnquiry(payload('partnership')).text, /Portfolio context: Support B2B companies/);
});

test('rejects incomplete fields, invalid email and unsafe website schemes', () => {
  assert.throws(() => prepareEnquiry({ ...payload('contact'), fields: { ...fields, message: '' } }));
  assert.throws(() => prepareEnquiry({ ...payload(), fields: { ...fields, email: 'invalid' } }));
  assert.throws(() => prepareEnquiry({ ...payload('audit'), fields: { ...fields, website: 'javascript:alert(1)' } }));
});

test('endpoint rejects foreign origins, malformed JSON and oversized submissions', async () => {
  assert.equal((await POST(request(payload(), 'https://other.example'))).status, 403);
  assert.equal((await POST(request('{'))).status, 400);
  assert.equal((await POST(request('x'.repeat(20001)))).status, 413);
});

test('mailer configuration, fixed recipients, Reply-To and provider failure', async () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.RESEND_FROM_EMAIL;
  const oldFetch = globalThis.fetch;
  try {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    assert.equal((await POST(request(payload()))).status, 503);
    process.env.RESEND_API_KEY = 'mock-key';
    process.env.RESEND_FROM_EMAIL = 'Regen Website <website@regendigital.co>';
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      const email = JSON.parse(options.body);
      assert.deepEqual(email.to, ['holly@regendigital.co', 'taylor@regendigital.co']);
      assert.equal(email.reply_to, 'visitor@example.com');
      assert.equal(email.from, process.env.RESEND_FROM_EMAIL);
      return Response.json({ id: 'mock-email-id' });
    };
    assert.deepEqual(await (await POST(request({ ...payload(), to: ['attacker@example.com'] }))).json(), { ok: true });
    globalThis.fetch = async () => Response.json({ message: 'provider error' }, { status: 429 });
    assert.equal((await POST(request(payload()))).status, 502);
    globalThis.fetch = async () => { throw new Error('network unavailable'); };
    assert.equal((await POST(request(payload()))).status, 502);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.RESEND_FROM_EMAIL; else process.env.RESEND_FROM_EMAIL = oldFrom;
  }
});
