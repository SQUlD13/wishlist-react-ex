import React, { Component } from 'react'

import BookPreview from './BookPreview.jsx'

export default class WishList extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: props?.selected || props.children[0] }
    }
    getClass = (child) => {
        var compClass = this.props.className
        compClass += (this.props.selected?.title === child.title) ? ' selected' : ''
        return compClass
    }
    render() {
        const { selected } = this.state
        return <div className="list-container" >
            {
                this.props.children.map((child) =>
                    <div className={this.getClass(child)} tabIndex="0" key={child.title} onClick={() => { this.props.selectItem(child); this.setState({ selected: child }) }}>
                        <p>{child.title}</p>
                        <button className='fas delete-button' onClick={() => this.props.deleteItem(child)}>&#xf2ed;</button>
                    </div>
                )
            }
        </div >

    }
}