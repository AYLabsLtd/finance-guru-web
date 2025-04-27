import React from 'react';
import { Container, Typography, Box, Alert, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Paper)(({ theme }) => ({
  padding: '24px',
  marginBottom: '24px',
}));

const Title = styled(Typography)({
  fontSize: '2.5rem',
  marginBottom: '20px',
  fontWeight: 600,
});

const Description = styled(Typography)({
  fontSize: '1.2rem',
  marginBottom: '32px',
  lineHeight: 1.6,
});

const SectionTitle = styled(Typography)({
  fontSize: '1.8rem',
  marginBottom: '16px',
  fontWeight: 500,
});

const SubTitle = styled(Typography)({
  fontSize: '1.4rem',
  marginTop: '16px',
  marginBottom: '12px',
  fontWeight: 500,
});

const SectionText = styled(Typography)({
  fontSize: '1.1rem',
  marginBottom: '16px',
  lineHeight: 1.5,
});

const Example = styled(Box)({
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
});

const ExampleTitle = styled(Typography)({
  fontWeight: 500,
  marginBottom: '8px',
});

const ExamplePoint = styled(Typography)({
  fontFamily: 'monospace',
  marginBottom: '4px',
  paddingLeft: '20px',
  position: 'relative',
  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: '8px',
  },
});

const ExampleResult = styled(Typography)({
  fontFamily: 'monospace',
  marginTop: '8px',
  fontStyle: 'italic',
});

const BulletPoint = styled(Typography)({
  fontSize: '1.1rem',
  marginBottom: '8px',
  paddingLeft: '20px',
});

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Title variant="h1">Welcome to Finance Guru</Title>
      <Description>
        Your comprehensive financial planning companion that helps you make informed decisions about loans, investments, and financial goals.
      </Description>

      <Section elevation={2}>
        <SectionTitle variant="h2">Book a Consultation</SectionTitle>
        <SectionText>
          For an introduction call or deeper dive into your financial future, please book some time on{' '}
          <Link href="https://calendly.com/aylabsltd" target="_blank" rel="noopener" sx={{ fontWeight: 'bold' }}>
            https://calendly.com/aylabsltd
          </Link>,
          introduction call with me is free of charge but an Interac of $25 (
          <Link href="mailto:aylabsltd@gmail.com" sx={{ fontWeight: 'bold' }}>
            aylabsltd@gmail.com
          </Link>
          ) is needed to confirm booking for advance discussion and getting fully tailored to your needs experience.
          In your Interac message, include the email you used to book the meeting.
        </SectionText>
      </Section>

      <Section elevation={2}>
        <SectionTitle variant="h2">Mortgage Calculator</SectionTitle>
        <SectionText>
          Plan your home loan effectively by calculating EMI, total interest, and more. Input your desired house cost, down payment, interest rate, and loan term to get detailed insights.
        </SectionText>
        <Example>
          <ExampleTitle>Example:</ExampleTitle>
          <ExamplePoint>House Cost: $500,000</ExamplePoint>
          <ExamplePoint>Down Payment: 20% ($100,000)</ExamplePoint>
          <ExamplePoint>Interest Rate: 8.5% p.a.</ExamplePoint>
          <ExamplePoint>Loan Term: 20 years</ExamplePoint>
          <ExampleResult>Results show your monthly EMI, total interest paid, and complete payment schedule.</ExampleResult>
        </Example>
      </Section>

      <Section elevation={2}>
        <SectionTitle variant="h2">SIP Calculator</SectionTitle>
        <SectionText>
          Two powerful calculators in one: Lump Sum and Monthly SIP. Calculate returns on your investments while considering tax implications and inflation adjustment.
        </SectionText>

        <SubTitle variant="h3">Lump Sum Investment</SubTitle>
        <Example>
          <ExampleTitle>Example:</ExampleTitle>
          <ExamplePoint>Investment Amount: $100,000</ExamplePoint>
          <ExamplePoint>Time Period: 10 years</ExamplePoint>
          <ExamplePoint>Expected Return: 12% p.a.</ExamplePoint>
          <ExamplePoint>LTCG Tax: 10%</ExamplePoint>
          <ExampleResult>See your expected returns, post-tax value, and inflation-adjusted growth.</ExampleResult>
        </Example>

        <SubTitle variant="h3">Monthly SIP</SubTitle>
        <Example>
          <ExampleTitle>Example:</ExampleTitle>
          <ExamplePoint>Monthly Investment: $10,000</ExamplePoint>
          <ExamplePoint>Time Period: 15 years</ExamplePoint>
          <ExamplePoint>Expected Return: 12% p.a.</ExamplePoint>
          <ExamplePoint>LTCG Tax: 10%</ExamplePoint>
          <ExampleResult>Calculate your wealth accumulation, actual returns, and real rate of return.</ExampleResult>
        </Example>
      </Section>

      <Section elevation={2}>
        <SectionTitle variant="h2">Car Loan Calculator</SectionTitle>
        <SectionText>
          Make smart decisions about your vehicle financing by understanding the complete cost breakdown, including EMI and total interest payable.
        </SectionText>
        <Example>
          <ExampleTitle>Example:</ExampleTitle>
          <ExamplePoint>Car Cost: $12,000</ExamplePoint>
          <ExamplePoint>Down Payment: 25% ($3,000)</ExamplePoint>
          <ExamplePoint>Interest Rate: 7.5% p.a.</ExamplePoint>
          <ExamplePoint>Loan Term: 5 years</ExamplePoint>
          <ExampleResult>Get insights into monthly payments, total interest, and overall cost.</ExampleResult>
        </Example>
      </Section>

      <Section elevation={2}>
        <SectionTitle variant="h2">Key Features</SectionTitle>
        <BulletPoint>• Real-time calculations with instant results</BulletPoint>
        <BulletPoint>• Consideration of taxes and inflation impacts</BulletPoint>
        <BulletPoint>• Detailed breakdown of all components</BulletPoint>
        <BulletPoint>• User-friendly sliders for easy input adjustment</BulletPoint>
        <BulletPoint>• Comprehensive result analysis</BulletPoint>
      </Section>

      <Alert severity="info" sx={{ mt: 4 }}>
        <Typography variant="body2">
          <strong>Advisory Note:</strong> This Website is for <em>testing purposes only</em> and
          should not be used for actual, real-life financial decisions. The results are purely
          illustrative and may not account for all factors relevant to your personal financial situation.
        </Typography>
      </Alert>
    </Container>
  );
}
