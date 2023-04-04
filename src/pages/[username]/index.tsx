import React from 'react';
import UserHomePageTemplate, { IProps as IUserHomePageTemplateProps } from 'Components/templates/user-home-page';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { axiosHelper } from 'helpers/axios-helper';

const UserHomePage = (props: IUserHomePageTemplateProps) => {
  return <UserHomePageTemplate {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const username = ctx?.params?.username;
  try {
    const axiosInstance = axiosHelper.createRequest({
      method: 'GET',
      url: '/v1/user/find-user-by-username/' + username,
      timeout: 100000,
    });
    const response = await axiosHelper.runRequest(axiosInstance)
      .then((res) => {
        return {
          props: {
            userData: res.data.data,
          },
        };
      })
      .catch((err) => { return Promise.reject(err); });
    return response;
  } catch {
    return { notFound: true };
  }
};

export default UserHomePage;
