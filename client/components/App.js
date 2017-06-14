import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessageList from './flash/FlashMessageList';

class App extends React.Component{
    render(){
        return (
            <section>
                <NavigationBar />
                {this.props.children}
            </section>
        );
    }
}
export default App;
    