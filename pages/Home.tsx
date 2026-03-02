import React from 'react';
import { Hero } from '../components/Hero';
import { ProductSnapshot } from '../components/ProductSnapshot';
import { Integrations } from '../components/Integrations';
import { HowItWorks } from '../components/HowItWorks';
import { WorkflowVideo } from '../components/WorkflowVideo';
import { KeyCapabilities } from '../components/KeyCapabilities';
import { InteractiveDemo } from '../components/InteractiveDemo';
import { ROICalculator } from '../components/ROICalculator';
import { Security } from '../components/Security';
import { FeatureMatrix } from '../components/FeatureMatrix';
import { CaseStudies } from '../components/CaseStudies';
import { Pricing } from '../components/Pricing';
import { SocialProof } from '../components/SocialProof';
import { FAQ } from '../components/FAQ';

export function Home() {
  return (
    <>
      <Hero />
      <ProductSnapshot />
      <Integrations />
      <HowItWorks />
      <WorkflowVideo />
      <KeyCapabilities />
      <InteractiveDemo />
      <ROICalculator />
      <Security />
      <FeatureMatrix />
      <CaseStudies />
      <Pricing />
      <SocialProof />
      <FAQ />
    </>
  );
}
