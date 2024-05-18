import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

export default function TitleAndSubTitle({
  title,
  subtitle,
  centered,
}: {
  title: string;
  subtitle: string;
  centered?: boolean;
}): JSX.Element {
  return (
    <>
      <Heading
        as="h1"
        size="lg"
        mb={1}
        textAlign={centered ? 'center' : 'start'}
      >
        {title}
      </Heading>
      <Text mb={10} textAlign={centered ? 'center' : 'start'}>
        {subtitle}
      </Text>
    </>
  );
}
