import React, { useContext } from 'react'
import classNames from 'classnames'

import { MenuContext } from './menu'

//定义MenuItemProps接口
export interface MenuItemProps {
	index: number
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}

//组件MenuItem：插入到Menu组件中的子元素，作为Menu组件中的实际内容单元
const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { className, index, disabled, style, children } = props

	//使用Context
	const context = useContext(MenuContext)

	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index,
	})

	//定义点击事件函数，若onSelect存在且MenuItem非disabled
	const handleClick = () => {
		if (context.onSelect && !disabled) {
			context.onSelect(index)
		}
	}

	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	)
}

export default MenuItem
