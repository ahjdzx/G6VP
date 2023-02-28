import { Avatar, Layout, Tooltip } from 'antd';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';

import ThemeSwitch from '@antv/gi-theme-antd';
import { LOGO_URL } from '../../services/const';
import DataModeCard from '../DataModeCard';
import ThemeVars from '../ThemeVars';
import './index.less';

const { Header } = Layout;
const BaseNavbar = props => {
  const history = useHistory();
  const { active = 'workspace', onChangeTheme } = props;
  const GI_USER_INFO = useUserInfo() as any;
  const theme = localStorage.getItem('@theme') || 'light';
  const [state, setState] = React.useState({
    logo: LOGO_URL[theme],
  });
  const { logo } = state;

  const IS_ANALYSIS_SPACE = history.location?.query.nav;

  const handleChangeTheme = val => {
    setState({
      logo: LOGO_URL[val],
    });
    onChangeTheme && onChangeTheme(val);
  };

  const { children } = props;
  return (
    <Header className="gi-navbar-container">
      <div className="left">
        <svg
          style={{ marginRight: '40px', paddingRight: '0px', cursor: 'pointer' }}
          width="156px"
          height="29px"
          viewBox="0 0 136 29"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          onClick={() => {
            history.push('/home');
          }}
        >
          <g id="全部页" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id='MacBook-Pro-14"' transform="translate(-352.000000, -500.000000)">
              <path
                d="M370.476172,500 C371.328138,500 372.11687,500.581935 372.254449,501.421938 C372.334925,501.897076 372.211272,502.38412 371.913893,502.763327 C371.616514,503.142534 371.172992,503.378732 370.692368,503.413848 L370.568461,503.418121 L357.136954,503.418121 C356.880595,503.418121 356.712252,503.672771 356.793433,503.900931 L356.822487,503.962457 L367.872418,523.101372 C367.999743,523.32184 368.299683,523.341495 368.457771,523.161189 L368.500498,523.101372 L375.098326,511.674593 C375.545245,510.901243 376.51001,510.516704 377.326086,510.884152 C377.74733,511.072694 378.074415,511.423585 378.232948,511.857015 C378.39148,512.290444 378.367982,512.769565 378.167799,513.185402 L378.107982,513.299909 L369.859201,527.587656 C369.513378,528.183834 368.876956,528.551502 368.18774,528.553275 C367.546842,528.553275 366.948671,528.232826 366.592332,527.708999 L366.514569,527.584237 L352.257586,502.895149 C351.914138,502.297821 351.914138,501.562946 352.257586,500.965619 C352.577468,500.413746 353.148625,500.054815 353.784632,500.005982 L353.929902,500 L370.476172,500 Z"
                id="主轮廓"
                fill={`var(--text-color)`}
              ></path>
              <path
                d="M371.56997,507.792462 C372.267267,507.792462 372.715041,508.513685 372.436464,509.129802 L372.391174,509.216964 L369.300338,514.57145 C369.140651,514.847652 368.853015,515.025284 368.534545,515.044371 C368.216076,515.063459 367.909282,514.921454 367.717748,514.666303 L367.655367,514.572305 L364.564531,509.216964 C364.403963,508.938199 364.395342,508.597123 364.541621,508.310602 C364.6879,508.024081 364.969214,507.831027 365.289173,507.797589 L365.386589,507.792462 L371.56997,507.792462 L371.56997,507.792462 Z"
                id="中间三角"
                fill={`var(--primary-color)`}
              ></path>
              <path
                d="M382.443014,500 C383.131765,500 383.770954,500.370012 384.11533,500.965619 C384.431506,501.514228 384.455433,502.187598 384.18711,502.75586 L384.11362,502.895149 L380.73139,508.754663 C380.483653,509.18562 380.06032,509.487135 379.572057,509.580388 C379.083793,509.673641 378.579138,509.54936 378.190017,509.240036 C377.548264,508.735863 377.403849,507.824079 377.751643,507.092601 L377.822569,506.957586 L379.551283,503.962457 C379.610089,503.860666 379.615987,503.736706 379.567111,503.629792 C379.518236,503.522877 379.420634,503.446232 379.305179,503.424103 L379.236816,503.418121 L376.230579,503.418121 C375.379466,503.418121 374.58988,502.836186 374.453156,501.996183 C374.373211,501.520942 374.497315,501.034019 374.794983,500.655022 C375.09265,500.276025 375.536297,500.040073 376.016946,500.005127 L376.139144,500 L382.442159,500 L382.443014,500 Z"
                id="顶部三角"
                fill={`var(--primary-color)`}
              ></path>
              <text
                id="AntV-Insight"
                font-family="AlibabaPuHuiTi_2_45_Light, Alibaba PuHuiTi 2.0"
                font-size="18"
                font-weight="500"
                fill={`var(--text-color)`}
              >
                <tspan x="389" y="521">
                  AntV Insight
                </tspan>
              </text>
            </g>
          </g>
        </svg>

        {/* <Divider type="vertical" style={{ padding: '0px 12px' }} /> */}

        <div style={{ marginRight: '36px', cursor: 'pointer' }} className={active === 'home' ? 'active' : ''}>
          <Link to="/home">首页</Link>
        </div>
        <div style={{ marginRight: '36px', cursor: 'pointer' }} className={active === 'dataset' ? 'active' : ''}>
          <Link to="/dataset/list">数据集</Link>
        </div>
        <div style={{ marginRight: '36px', cursor: 'pointer' }} className={active === 'workbook' ? 'active' : ''}>
          <Link to="/workbook/project">工作薄</Link>
        </div>
        <div style={{ marginRight: '36px', cursor: 'pointer' }} className={active === 'open' ? 'active' : ''}>
          <Link to="/open/assets">开放市场</Link>
        </div>
      </div>
      {children}
      <div className="right">
        <DataModeCard />
        <Tooltip title="切换主题">
          <ThemeSwitch
            //@ts-ignore
            themeVars={ThemeVars}
            antdCssLinks={{
              // dark: 'https://gw.alipayobjects.com/os/lib/antv/gi-theme-antd/0.1.0/dist/dark.css', //本地调试的时候：'http://127.0.0.1:5500/dark.css',
              // light: 'https://gw.alipayobjects.com/os/lib/antv/gi-theme-antd/0.1.0/dist/light.css', //</Tooltip> 'http://127.0.0.1:5500/light.css',
              dark: 'public/css/gi-theme-antd.dark.css',
              light: 'public/css/gi-theme-antd.light.css',
              ali: 'public/css/gi-theme-antd.ali.css',
            }}
            onChange={handleChangeTheme}
            options={[
              {
                value: 'light',
                icon: (
                  <div
                    className="theme-color-dot"
                    style={{
                      backgroundColor: 'rgba(48, 86, 227, 0.5)',
                    }}
                  />
                ),
                name: '科技蓝',
              },
              {
                value: 'ali',
                icon: (
                  <div
                    className="theme-color-dot"
                    style={{
                      backgroundColor: 'rgba(255, 106, 0, 0.5)',
                    }}
                  />
                ),
                name: '阿里橙',
              },
              {
                value: 'dark',
                icon: (
                  <div
                    className="theme-color-dot"
                    style={{
                      backgroundColor: 'rgba(31, 31, 31, 0.5)',
                    }}
                  />
                ),
                name: '暗夜黑',
              },
            ]}
          ></ThemeSwitch>
        </Tooltip>
        {GI_USER_INFO && (
          <Avatar
            style={{ width: '24px', height: '24px', marginLeft: 8 }}
            src={`https://work.alibaba-inc.com/photo/${GI_USER_INFO && GI_USER_INFO.outUserNo}.220x220.jpg`}
          />
        )}
      </div>
    </Header>
  );
};

export default BaseNavbar;
