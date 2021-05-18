import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
	defaultIndex: '0',
	onSelect: jest.fn(),
	className: 'test',
}

const testVerProps: MenuProps = {
	defaultIndex: '0',
	mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled>disabled</MenuItem>
			<MenuItem>xyz</MenuItem>
			<SubMenu title='dropdown'>
				<MenuItem>drop1</MenuItem>
			</SubMenu>
			{/* <li>123</li> */}
		</Menu>
	)
}

//创建需要的css样式
const createStyleFile = () => {
	const cssFile: string = `
    .blue-submenu {
      display:none;
    }
    . blue-submenu.menu-opened {
      display:block;
    }
  `

	const style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = cssFile
	return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test  Menu and MenuItem component', () => {
	beforeEach(() => {
		//生成要测试的父组件
		wrapper = render(generateMenu(testProps))
		//将样式插入到container中
		wrapper.container.append(createStyleFile())
		//通过父组件拿到所有的子组件
		menuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('active')
		disabledElement = wrapper.getByText('disabled')
	})

	//正确渲染默认props时的Menu和MenuItem组件
	it('should render correct Menu and MenuItem based on default props', () => {
		//测试在文档中
		expect(menuElement).toBeInTheDocument()
		//测试含有类名
		expect(menuElement).toHaveClass('blue-menu test')
		//测试含有n个指定元素
		// expect(menuElement.getElementsByTagName('li').length).toEqual(3)
		expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)

		expect(activeElement).toHaveClass('menu-item is-active')
		expect(disabledElement).toHaveClass('menu-item is-disabled')
	})

	//点击MenuItem时改变active状态并触发正确回调
	it('click items should change active and call the right callback', () => {
		const thirdItem = wrapper.getByText('xyz')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-active')
		expect(activeElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).toHaveBeenCalledWith('2')
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
	})

	//当mode参数设置为vertical时渲染为纵向模式
	it('should render vertical mode when mode is set vertical', () => {
		cleanup()
		const wrapper = render(generateMenu(testVerProps))
		const menuElement = wrapper.getByTestId('test-menu')

		expect(menuElement).toHaveClass('menu-vertical')
	})

	it('should show dropdown items when hover on subMenu', async () => {
		expect(wrapper.queryByText('drop1')).not.toBeVisible()
		const dropdownElement = wrapper.getByText('dropdown')
		fireEvent.mouseEnter(dropdownElement)
		await wait(() => {
			expect(wrapper.queryByText('drop1')).toBeVisible()
		})
	})
})
