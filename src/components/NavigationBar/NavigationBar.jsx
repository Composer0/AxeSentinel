import React, { useState } from 'react';
import "./NavigationBar.scss"

function NavigationBar() {
    const [activeItem, setActiveItem] = useState(0);

    const handleClick = (index) => {
        setActiveItem(index);
    };

    const navItems = [
        { text: 'Card', icon: 'card', id: 'card-group' },
        { text: 'Table', icon: 'table', id: 'team-member-rows' }
    ];

    return (
        <nav className="navigation">
            <ul className="nav-list">
                {navItems.map((item, index) => (
                    <li key={index} className={index === activeItem ? "active" : ""} onClick={() => handleClick(index)}>
                        <a href={`#${item.id}`}>
                            {/* svg icon */}
                            {item.text}
                        </a>
                    </li>
                ))}
                <div className="active-bar"></div>
            </ul>
        </nav>
    );
}

export default NavigationBar;

