import React, { useState } from 'react'

function Location() {
    const items = [{id:1, label: 'ayoub', content: 'test ayoub'}, {id:2, label: 'saif', content: "test saif"}]
    const [activeTab, setActiveTab] = useState(items[0].id);

    const handleTabClick = (id) => {
      setActiveTab(id);
    };
  
    return (
      <div className="nav-align-left mt-5">
        <ul className="nav nav-tabs" role="tablist">
          {items.map((item) => (
            <li className="nav-item" key={item.id}>
              <button
                type="button"
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                role="tab"
                data-bs-toggle="tab"
                onClick={() => handleTabClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {items.map((item) => (
            <div
              className={`tab-pane fade ${activeTab === item.id ? 'show active' : ''}`}
              id={`navs-left-align-${item.id}`}
              key={item.id}
            >
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Location