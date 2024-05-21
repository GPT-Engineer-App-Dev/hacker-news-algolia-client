import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box, Link, Heading } from "@chakra-ui/react";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://hn.algolia.com/api/v1/search?query=react")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Hacker News Client
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          articles.map((article) => (
            <Box key={article.objectID} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Link href={article.url} isExternal>
                <Text fontSize="lg" fontWeight="bold">
                  {article.title}
                </Text>
              </Link>
              <Text fontSize="sm" color="gray.500">
                {article.author} - {new Date(article.created_at).toLocaleString()}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;