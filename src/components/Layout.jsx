import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import styled, { ThemeProvider } from 'styled-components';

import '../fonts/sanfransisco-font.css';

import { BASE_THEME, LIGHT_THEME, DARK_THEME } from '../util/constants';

import { InlineButton } from '../components/UI';

const Layout = ({ children }) => {
  const [isDark, setDark] = useState(false);

  const theme = {
    ...BASE_THEME,
    ...(isDark ? DARK_THEME : LIGHT_THEME),
  };

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <ThemeProvider theme={theme}>
          <>
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <InlineButton onClick={() => setDark(!isDark)}>
                  {isDark ? 'Light' : 'Dark'} theme
                </InlineButton>
              </div>
              <SiteWrapper>
                <Helmet>
                  <style>{`body { background-color: ${theme.backgroundColor} }`}</style>
                </Helmet>
                <PageContainer>{children}</PageContainer>
              </SiteWrapper>
            </div>
          </>
        </ThemeProvider>
      )}
    />
  );
};

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageContainer = styled.div`
  max-width: 1000px;
  margin-bottom: 150px;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;