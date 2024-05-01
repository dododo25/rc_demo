import { useState } from 'react';

import './CustomSelectorWithInput.scss';

const filterItems = (items, input, setSelectedFunc, callback) => {
  const result = [];

  const handleClick = (index) => {
    setSelectedFunc(index);
    callback(index);
  };

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.toLowerCase().startsWith(input)) {
      result.push(<li key={item}><a className='dropdown-item overflow-hidden' href='#' onClick={() => handleClick(i)}>{item}</a></li>);
    }
  }

  return result;
};

const CustomSelectorWithInput = props => {
  const [selected, setSelected] = useState(-1);
  const [input, setInput] = useState('');

  const filteredItems = filterItems(props.objects, input, setSelected, props.onSelected);

  return (
    <div className='dropdown' style={{width: '14em'}}>
      <div className={`w-100 d-flex border btn dropdown-toggle`} data-bs-toggle='dropdown' aria-expanded='false'>
        <span className='flex-grow-1 text-start overflow-hidden ms-2'>{selected === -1 ? props.placeholder : props.objects[selected]}</span>
        <span className="material-symbols-outlined">
          arrow_drop_down
        </span>
      </div>
      <form className='dropdown-menu w-100 p-2'>
        <input type='text' className='form-control' placeholder='Search' onChange={e => setInput(e.target.value)} />
        <li><hr className='dropdown-divider' /></li>
        <div style={{overflowY: 'scroll', height: '8em'}}>
          {filteredItems}
        </div>
      </form>
    </div>
  );
};

export default CustomSelectorWithInput;