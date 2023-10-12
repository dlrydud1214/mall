import styled, {css} from "styled-components";


function Tablist()  {
    return (
        <Tabwrapper>
            1
        </Tabwrapper>
    )
}

export default Tablist;

export const Tabwrapper = styled.div `
    ${({theme})=>css `
        color : ${theme.colors.Primary[100]}
    `}
`