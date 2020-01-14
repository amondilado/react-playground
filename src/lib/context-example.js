import React from "react";

// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
    name: 'Guest',
});

class MultipleContextsExample extends React.Component {
    render() {
        const {signedInUser, theme} = this.props;

        // App component that provides initial context values
        return (
            <ThemeContext.Provider value={theme}>
                <UserContext.Provider value={signedInUser}>
                    <Layout />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

function Layout() {
    return (
        <div>
            <Sidebar />
            <Content />
        </div>
    );
}

function Sidebar() {
    const content = <aside>sidebar</aside>;
    return content;
}
// A component may consume multiple contexts
function Content() {
    return (
        <main>
            <ThemeContext.Consumer>
                {theme => (
                    <UserContext.Consumer>
                        {user => (
                            <p className={'_themed ' + theme}>user={user} theme={theme}</p>
                        )}
                    </UserContext.Consumer>
                )}
            </ThemeContext.Consumer>
        </main>
    );
}
export default MultipleContextsExample;