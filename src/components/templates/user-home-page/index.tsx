import React from 'react'
import { IAuthReducer } from 'Redux/reducers/auth-reducer'

export interface IProps { userData: IAuthReducer['userData'] }

const UserHomePageTemplate = (props: IProps) => {
  return props.userData ? (
    <div className='flex flex-col space-y-4'>
      <h1>user home page <strong>{props.userData.username}</strong></h1>
      <table>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        {Object.entries(props.userData).map((data) => {
          return (
            <tr>
              <td>{data[0]}</td>
              <td>{data[1] ?? 'nil'}</td>
            </tr>
          )
        })}
      </table>
    </div>
  ) : <></>
}

export default UserHomePageTemplate