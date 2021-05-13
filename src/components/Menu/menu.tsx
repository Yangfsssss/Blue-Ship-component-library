import React, { createContext, useState } from 'react'
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: number) => void

//定义MenuProps接口
export interface MenuProps {
	defaultIndex?: number
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: selectCallback
}

//定义MenuContext接口
interface IMenuContext {
	index: number
	onSelect?: selectCallback
}

//创建Context容器,给出默认值
export const MenuContext = createContext<IMenuContext>({ index: 0 })

//组件Menu：容器，包含子组件MenuItem
const Menu: React.FC<MenuProps> = (props) => {
	const { className, mode, style, children, defaultIndex, onSelect } = props

	//记录当前被选中MenuItem的index
	const [currentActive, setActive] = useState(defaultIndex)

	const classes = classNames('blue-menu', className, { 'menu-vertical': mode === 'vertical' })

	//定义传给MenuItem的点击处理函数
	const handleClick = (index: number) => {
		setActive(index)
		if (onSelect) {
			onSelect(index)
		}
	}

	//定义要传递的Context
	const passedContext: IMenuContext = {
		index: currentActive ? currentActive : 0,
		onSelect: handleClick,
	}

	return (
		<ul className={classes} style={style} data-testid={'test-menu'}>
			<MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	defaultIndex: 0,
	mode: 'horizontal',
}

export default Menu
