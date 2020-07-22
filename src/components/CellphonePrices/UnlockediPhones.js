import React from 'react'


class UnlockediPhones extends React.Component {


    constructor() {
        super()
        this.state = {
            unlockedIphones: []
        }
        this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount() {

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {

        return (
            <div>
            </div>
        )
    }
}


export default UnlockediPhones;