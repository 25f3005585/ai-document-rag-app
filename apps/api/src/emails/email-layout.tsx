import type { ReactNode } from 'react';
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from 'react-email';

import {
  APP_NAME,
  body,
  brandName,
  colors,
  container,
  footer,
  footerText,
  header,
  heading,
  main,
  mark,
} from './styles.js';

interface EmailLayoutProps {
  preview: string;
  title: string;
  children: ReactNode;
  siteUrl: string;
  footerNote?: string;
}

export const EmailLayout = ({
  preview,
  title,
  children,
  siteUrl,
  footerNote,
}: EmailLayoutProps) => (
  <Html lang="en">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Row>
            <Column style={{ width: '28px', verticalAlign: 'middle' }}>
              <Text style={{ ...mark, margin: 0 }}>A</Text>
            </Column>
            <Column style={{ paddingLeft: '10px', verticalAlign: 'middle' }}>
              <Text style={{ ...brandName, margin: 0 }}>{APP_NAME}</Text>
            </Column>
          </Row>
        </Section>

        <Section style={body}>
          <Heading as="h1" style={heading}>
            {title}
          </Heading>
          {children}
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            {footerNote ??
              `This message was sent by ${APP_NAME}. If you weren't expecting it, you can ignore it.`}
          </Text>
          <Text style={{ ...footerText, marginTop: '8px' }}>
            <Link href={siteUrl} style={{ color: colors.subtle, textDecoration: 'none' }}>
              {APP_NAME}
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
