import { Flex, Image, Stack, Heading, Text } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  return (
    <Flex>
      <Stack>
        <Image src={randomPic} alt="random pic" />
      </Stack>

      <Stack>
        <Heading as="h1" size="lg" mb={5} color="#000" fontWeight="500">
          This is Heading...
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dolores totam blanditiis soluta quae delectus doloremque velit sit
          corrupti iure natus nobis nesciunt, tempore repellat cupiditate culpa
          voluptatum expedita. Ducimus sapiente exercitationem repellendus et
          aspernatur. Aspernatur expedita a ea non iure aperiam assumenda
          praesentium beatae numquam repellat, excepturi impedit voluptatem!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dolores totam blanditiis soluta quae delectus doloremque velit sit
          corrupti iure natus nobis nesciunt, tempore repellat cupiditate culpa
          voluptatum expedita. Ducimus sapiente exercitationem repellendus et
          aspernatur. Aspernatur expedita a ea non iure aperiam assumenda
          praesentium beatae numquam repellat, excepturi impedit voluptatem!
        </Text>
      </Stack>
    </Flex>
  )
}
