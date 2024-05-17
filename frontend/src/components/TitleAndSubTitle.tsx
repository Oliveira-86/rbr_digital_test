import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function TitleAndSubTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}): JSX.Element {
  return (
    <>
      <Heading as="h1" size="lg" mb={1}>
        {title}
      </Heading>
      <Text mb={10}>{subtitle}</Text>
    </>
  );
}
