/* motif-page.jsx — stage + tweaks wrapper */
const { CompositionStage, CreatorLink, useTweaks, TweaksPanel, TweakSection, TweakToggle } = window;

function MotifPage() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return React.createElement(
    'div',
    { style: { width: '100%', height: '100%', background: '#EDEAE2' } },
    React.createElement(
      CompositionStage,
      {
        width: 1200, height: 800, bg: '#EDEAE2',
        scenes: window.OM_SCENES, playback: window.OM_PLAYBACK,
      },
      React.createElement(CreatorLink, null)
    ),
    React.createElement(
      TweaksPanel,
      null,
      React.createElement(TweakSection, { label: 'Editing' }),
      React.createElement(TweakToggle, {
        label: 'Motion editor', value: t.motionEditor,
        onChange: (v) => setTweak('motionEditor', v),
      })
    )
  );
}

window.MotifPage = MotifPage;
