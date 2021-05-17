import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import MenuItem, { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void

//定义MenuProps接口
export interface MenuProps {
	defaultIndex?: string
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: selectCallback
}

//定义MenuContext接口
interface IMenuContext {
	index: string
	onSelect?: selectCallback
	mode?: MenuMode
}

//创建Context容器,给出默认值
export const MenuContext = createContext<IMenuContext>({ index: '0' })

//组件Menu：容器，包含子组件MenuItem
const Menu: React.FC<MenuProps> = (props) => {
	const { className, mode, style, children, defaultIndex, onSelect } = props

	//记录当前被选中MenuItem的index
	const [currentActive, setActive] = useState(defaultIndex)

	const classes = classNames('blue-menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode !== 'vertical',
	})

	//定义传给MenuItem的点击处理函数
	const handleClick = (index: string) => {
		setActive(index)
		if (onSelect) {
			onSelect(index)
		}
	}

	//定义要传递的Context
	const passedContext: IMenuContext = {
		index: currentActive ? currentActive : '0',
		onSelect: handleClick,
		mode,
	}

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			const { displayName } = childElement.type
			if (displayName === 'MenuItem' || displayName === 'SubMenu') {
				return React.cloneElement(childElement, {
					index: index.toString(),
				})
			} else {
				console.error('Warning：Menu has a child which is not a menuItem')
			}
		})
	}

	return (
		<ul className={classes} style={style} data-testid={'test-menu'}>
			<MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
}

MenuItem.displayName = 'MenuItem'

export default Menu
