// シンプルな前端ロジック
(function(){
  const inputEl = document.getElementById('input');
  const modeEl = document.getElementById('mode');
  const operationEl = document.getElementById('operation');
  const runBtn = document.getElementById('run');
  const outputEl = document.getElementById('output');

  const numberOps = [
    {value:'sum', label:'合計 (sum)'},
    {value:'avg', label:'平均 (average)'},
    {value:'product', label:'積 (product)'}
  ];

  const stringOps = [
    {value:'length', label:'文字数 (length)'},
    {value:'words', label:'単語数 (word count)'},
    {value:'reverse', label:'逆順 (reverse)'},
    {value:'upper', label:'大文字 (uppercase)'},
    {value:'lower', label:'小文字 (lowercase)'}
  ];

  function setOperationsForMode(mode){
    operationEl.innerHTML = '';
    const ops = mode === 'number' ? numberOps : stringOps;
    ops.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.value; opt.textContent = o.label;
      operationEl.appendChild(opt);
    });
  }

  function parseNumbers(text){
    if(!text) return [];
    return text.split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => Number(s))
      .filter(n => !Number.isNaN(n));
  }

  function runNumberOp(op, text){
    const nums = parseNumbers(text);
    if(nums.length === 0) return '数値が見つかりません。カンマ区切りで数を入力してください（例: 1,2,3）';
    if(op === 'sum'){
      const s = nums.reduce((a,b) => a + b, 0);
      return String(s);
    }
    if(op === 'avg'){
      const s = nums.reduce((a,b) => a + b, 0) / nums.length;
      return String(s);
    }
    if(op === 'product'){
      const p = nums.reduce((a,b) => a * b, 1);
      return String(p);
    }
    return '未対応の操作';
  }

  function runStringOp(op, text){
    if(op === 'length') return String(text.length);
    if(op === 'words'){
      const words = text.trim().split(/\s+/).filter(Boolean);
      return String(words.length);
    }
    if(op === 'reverse'){
      return text.split('').reverse().join('');
    }
    if(op === 'upper') return text.toUpperCase();
    if(op === 'lower') return text.toLowerCase();
    return '未対応の操作';
  }

  // 初期化
  setOperationsForMode(modeEl.value);

  modeEl.addEventListener('change', () => {
    setOperationsForMode(modeEl.value);
  });

  runBtn.addEventListener('click', () => {
    const mode = modeEl.value;
    const op = operationEl.value;
    const text = inputEl.value.trim();
    try{
      let result;
      if(mode === 'number') result = runNumberOp(op, text);
      else result = runStringOp(op, text);
      outputEl.textContent = result;
    }catch(e){
      outputEl.textContent = 'エラーが発生しました: ' + (e && e.message ? e.message : String(e));
    }
  });

})();
