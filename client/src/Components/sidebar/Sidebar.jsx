import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutBtn from './LogoutBtn'

function Sidebar() {
    return (
		<div className='border border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='mb-5 px-3'></div>
			<Conversations/>
			<div className='divider px-3'></div>
			<LogoutBtn/>
		</div>

    )
}

export default Sidebar
