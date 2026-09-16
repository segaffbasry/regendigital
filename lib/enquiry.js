const types = {
  contact: { title: "New Regen enquiry", fields: ["name", "email", "company", "service", "message"] },
  audit: { title: "Free marketing audit request", fields: ["name", "email", "company", "website", "channel", "goal"] },
  partnership: { title: "Portfolio partnership call request", fields: ["name", "email", "firm", "website", "scope", "context"] },
  strategy: { title: "Strategy call enquiry", fields: ["name", "email"] },
};

const labels = { name: "Name", email: "Work email", company: "Company", service: "Looking for", message: "What they want to achieve", website: "Website", channel: "Priority channel", goal: "What they want reviewed", firm: "Fund or firm", scope: "Partnership scope", context: "Portfolio context" };

export function prepareEnquiry(payload) {
  const definition = types[payload?.type];
  if (!definition || !payload.fields || typeof payload.fields !== "object") throw new Error("Please choose a valid enquiry type.");
  const fields = {};
  for (const key of definition.fields) {
    const value = payload.fields[key];
    if (typeof value !== "string" || !value.trim() || value.length > (key === "email" ? 254 : 5000)) {
      throw new Error(`Please provide a valid ${labels[key].toLowerCase()}.`);
    }
    fields[key] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || /[\r\n]/.test(fields.email)) throw new Error("Please provide a valid work email.");
  if (fields.website) {
    let url;
    try { url = new URL(fields.website); } catch { throw new Error("Please provide a valid website URL."); }
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("Please provide a valid website URL.");
  }
  const name = fields.name.replace(/[\r\n]/g, " ").slice(0, 150);
  const page = typeof payload.page === "string" && payload.page.startsWith("/") ? payload.page.slice(0, 300) : "Unknown";
  return {
    subject: `${definition.title} from ${name}`,
    reply_to: fields.email,
    text: [definition.title, `Submitted from: ${page}`, "", ...definition.fields.map((key) => `${labels[key]}: ${fields[key]}`)].join("\n"),
  };
}
