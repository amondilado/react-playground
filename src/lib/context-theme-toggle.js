import React from "react";
import {ThemeContext} from '../theme-context';

function ThemeToggleButton() {
    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => (
                <button className="btn"
                    onClick={toggleTheme}
                    style={{backgroundColor: theme.background, color: theme.foreground}}>
                    Toggle Theme
                </button>
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemeToggleButton;