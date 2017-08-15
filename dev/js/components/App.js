import React, { Component } from 'react';
import { Link }	from 'react-router';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

export default class App extends Component {

	render() {
		const items = [
			<SidebarItem href="/">
				Upload
			</SidebarItem>,
            <SidebarItem href="/table">
            	Table
            </SidebarItem>		
		];

		return (
			<Sidebar background="#252525" color="#c6c6c6" content={items} width={200}>
				<div className="main-container">
					{this.props.children}
				</div>
			</Sidebar>
		);
	}
}
