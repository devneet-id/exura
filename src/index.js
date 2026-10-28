/* ============================================================
 * Homepage — exurajs modules
 * Each class is a module; its name is its tag: demo ↔ <exura-demo>.
 * ============================================================ */

document.documentElement.setAttribute('js', '');


/* light / dark — no tag, state + effect only */
Exura.module(class site {
  static init() {
    let mode = 'dark'; // dark by default
    try { mode = sessionStorage.getItem('exura-mode') || 'dark'; } catch (e) {}
    this.state.set('mode', mode);
    this.effect(() => {
      const dark = this.state.get('mode') === 'dark';
      document.documentElement.toggleAttribute('dark', dark);
      try { sessionStorage.setItem('exura-mode', this.state.get('mode')); } catch (e) {}
    }, ['mode']);
  }
  static toggle() {
    this.state.set('mode', this.state.get('mode') === 'dark' ? 'light' : 'dark');
  }
});
site.init();


/* hero code window — tabs (highlight.js colours the code after each render) */
Exura.module(class demo {
  static samples = {
    css: { file: 'index.html', lang: 'html', code:
`<div card="white" ring="s:full">
  <h4>Pro</h4>
  <p text="default">Every component.</p>
  <button button="primary" md:button="lg">Choose</button>
</div>` },
    js: { file: 'index.html', lang: 'html', code:
`<exura-hello>Hi, {{name}}!</exura-hello>

<\u0073cript>
  Exura.module(class hello {
    static init() {
      this.state.set('name', 'Anwar');
      this.effect(() => this.render(), ['name']);
    }
  });
  hello.init();
<\/\u0073cript>` }, // written this way: a literal script tag would end the page's own script
    php: { file: 'index.php', lang: 'php', code:
`<?php
require __DIR__ . '/exura.php';

Exura::module('GET', 'user/*', function() {
  return ['data' => 'Hello 👋'];
});

Exura::fallback(); // 404 as JSON` },
  };

  static init() {
    this.show('css');
    this.effect(() => {
      this.render();
      const code = this.dom.find('code');
      if (code && window.hljs) hljs.highlightElement(code.target);
    }, ['tab']);
  }

  static show(tab) {
    const sample = this.samples[tab];
    for (const name of ['css', 'js', 'php']) {
      // keys css/js/php would clash with Crafter's template names
      this.state.set('on_' + name, name === tab ? 'primary' : '');
    }
    this.state.set('file', sample.file);
    this.state.set('lang', sample.lang);
    this.state.set('code', sample.code);
    this.state.set('tab', tab);
  }
});
demo.init();


/* every other code panel */
document.querySelectorAll('pre[panel] code').forEach((code) => {
  if (window.hljs && !code.closest('exura-demo')) hljs.highlightElement(code);
});


/* live counter — {{tone}} drives exuracss attributes */
Exura.module(class counter {
  static init() {
    this.set(0);
    this.effect(() => this.render(), ['count']);
  }
  static set(n) {
    const tone = n > 0 ? 'primary' : n < 0 ? 'secondary' : 'default';
    const label = n === 0 ? 'Press + 1 to start.' : `card="${tone}:2" — the color follows the count.`;
    this.state.set('tone', tone);
    this.state.set('label', label);
    this.state.set('count', n);
  }
  static add(n) { this.set(this.state.get('count') + n); }
  static reset() { this.set(0); }
});
counter.init();


/* copy a code panel */
Exura.module(class copier {
  static run(button, id) {
    const text = document.getElementById(id).innerText;
    const done = (label) => {
      button.textContent = label;
      setTimeout(() => { button.textContent = 'Copy'; }, 1500);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => done('Copied'), () => done('Select & copy'));
    } else {
      done('Select & copy');
    }
  }
});


/* reveal on scroll — Exura.watch */
document.querySelectorAll('[reveal]').forEach((el) => {
  Exura.watch(el, () => el.setAttribute('shown', ''));
});
