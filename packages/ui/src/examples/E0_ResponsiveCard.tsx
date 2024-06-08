import { Flex, Image, Stack, Heading, Text, Box, Circle } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'
  return (
    <>
      {/* Card with responsive image and content layout */}
      <Flex
        p={2}
        m={2}
        shadow="lg"
        w={{ base: '100%', sm: '250px', md: '100%' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Stack
          w={{ sm: '30%', base: '100%' }}
          display="flex"
          justify="center"
          align="center"
        >
          <Image
            borderRadius={{ base: 'full', sm: 'none' }}
            boxSize="200px"
            src={randomPic}
            alt="random pic"
          />
        </Stack>
        <Stack
          w={{ base: '100%', sm: '70%' }}
          justify="center"
          spacing={4}
        >
          <Heading
            as="h2"
            size="md"
            color="#000"
            fontWeight="500"
            textAlign={{ base: 'center', sm: 'inherit' }}
          >
            The standard Lorem Ipsum passage, used since the 1500s
          </Heading>
          <Text p={1.5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Stack>
      </Flex>

      {/* Card with single circular image and content */}
      <Flex
        m={2}
        shadow="lg"
        align="left"
        justify="left"
        direction="column"
        p={4}
        boxShadow="md"
        borderRadius="md"
        w={{ sm: '250px', base: '100%' }}
      >
        <Stack w="100%" justify="center" align="center">
          <Image
            src={randomPic}
            alt="random pic"
            borderRadius="full"
            boxSize="200px"
          />
        </Stack>
        <Heading as="h2" size="md" mt={2} mb={3} color="#000" fontWeight="500" textAlign="left">
          The standard Lorem Ipsum passage, used since the 1500s
        </Heading>
        <Text textAlign="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Flex>
    </>
  );
};