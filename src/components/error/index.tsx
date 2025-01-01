import React from 'react';
import { Button, Result } from 'antd';

const ErrorComponent: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, There was a problem loading the page."
  />
);

export default ErrorComponent;