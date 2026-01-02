import React from 'react';
import styled, { keyframes } from 'styled-components';

// Pulse Animation
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

// Fade In/Out Animation
const fadeInOut = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

// Fade Out Animation (for exit)
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

// Styled Components - MATCHING YOUR DARK THEME
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #050006;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  &.fade-out {
    animation: ${fadeOut} 0.5s ease-out forwards;
  }
`;

const LoaderContent = styled.div`
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  animation: ${pulse} 2s ease-in-out infinite;
  /* ❌ Removed: filter: drop-shadow(0 10px 30px rgba(239, 68, 68, 0.4)); */

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

const LoadingText = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
  animation: ${fadeInOut} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #EF4444 0%, #F87171 100%);
  border-radius: 50px;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* ❌ Removed: box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); */
`;

const ProgressLabel = styled.span`
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: bold;
  padding-right: 8px;
  white-space: nowrap;
`;

const PercentageText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Main Component
const GlobalLoader = ({ progress = 0 }) => {
  return (
    <LoaderContainer>
      <LoaderContent>
        {/* Pulsing Logo */}
        <LogoContainer>
          <Logo 
            src="/android-chrome-192x192.png" 
            alt="Logo"
          />
        </LogoContainer>

        {/* Loading Text */}
        <LoadingText>Loading Portfolio...</LoadingText>

        {/* Progress Bar */}
        <ProgressBarContainer>
          <ProgressBarFill progress={progress}>
            <ProgressLabel>{progress}%</ProgressLabel>
          </ProgressBarFill>
        </ProgressBarContainer>

        {/* Percentage Display */}
        <PercentageText>{progress}% Complete</PercentageText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default GlobalLoader;