import React from 'react';
import { Box, Stack, Text, Button } from 'grommet';
// import { InProgress } from 'grommet-icons';
import styled from 'styled-components';
import Icon from './Icon';
import Spinner from './Spinner';
import inject from './inject';

const Demo = ({
  status,
  src,
  showFallback,
  iframeOnLoad,
  width = '360px',
  height = '640px',
  withFrame = false,
}) => (
  <Box
    background={{ color: 'brand' }}
    gap="large"
    round={withFrame ? 'large' : 'xsmall'}
    align="center"
    justify="center"
    elevation="large"
    overflow="hidden"
  >
    <Box
      width={width}
      height={height}
      margin={
        withFrame
          ? {
              horizontal: '16px',
              vertical: '64px',
            }
          : {}
      }
      background={{ color: 'white' }}
    >
      <Stack>
        <Box width={width} height={height} align="center" justify="center">
          {src && (status === 'busy' || status === 'ok') && (
            <Box animation="fadeIn">
              <Spinner />
            </Box>
          )}
        </Box>
        <Box width={width} height={height}>
          <Iframe
            src={status === 'busy' || status === 'ok' ? src : ''}
            onLoad={iframeOnLoad}
          />
        </Box>
        {status === 'idle' && (
          <Box width={width} height={height} align="center" justify="center">
            <Text as="div" textAlign="center" margin="large">
              Enter your email address and site's URL to view your instant demo
              here.
            </Text>
          </Box>
        )}
        {status === 'error' && (
          <Box width={width} height={height} align="center" justify="center">
            <Text as="div">Use blog.frontity.com</Text>
            <Box
              round="small"
              border={{
                color: 'border',
                size: 'small',
              }}
              pad={{
                horizontal: '12px',
                vertical: '6px',
              }}
              margin="large"
            >
              <Button
                plain
                color="white"
                label="see our blog"
                icon={<Icon />}
                onClick={showFallback}
              />
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  </Box>
);

const Iframe = styled.iframe`
  margin: 0;
  padding: 0;
  border: none;
  width: 100%;
  height: 100%;
`;

export default inject(
  ({ store }) => ({
    status: store.status,
    src: store.demoUrl,
    showFallback: store.showFallback,
    iframeOnLoad: store.iframeOnLoad,
  }),
  Demo,
);
