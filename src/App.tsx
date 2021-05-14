import React from 'react'

import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import SubMenu from './components/Menu/subMenu'
import MenuItem from './components/Menu/menuItem'

const App: React.FC = () => {
	return (
		<div className='App'>
			<header className='App-header'>
				<Menu
					// mode='vertical'
					onSelect={(index) => {
						alert(index)
					}}>
					<MenuItem>cool link</MenuItem>
					<MenuItem disabled>cool link2</MenuItem>
					<SubMenu title='dropdown'>
						<MenuItem>dropdown 1</MenuItem>
						<MenuItem>dropdown 2</MenuItem>
					</SubMenu>
					<MenuItem>cool link3</MenuItem>
				</Menu>
			</header>
		</div>
	)
}

export default App
