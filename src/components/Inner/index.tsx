import {PropsWithChildren} from 'react'

// type InnerProps = {
    // ({children} :PropsWithChildren<InnerProps>)
// }
export const Inner = ({children} :PropsWithChildren) => {
    return <div style={{padding:"0 20px"}}>{children}</div>
}

export default Inner;