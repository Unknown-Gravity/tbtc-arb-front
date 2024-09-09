import { Box, BoxProps, Flex, Text, useColorMode } from '@chakra-ui/react';
import { InfoIcon } from '../assets/icons/InfoIcon';

type AlertMessageBoxProps = {
    message: React.ReactNode;
} & BoxProps;

const AlertMessageBox = ({ message, ...boxProps }: AlertMessageBoxProps) => {
    const { colorMode } = useColorMode();

    return (
        <Box
            bg={colorMode === 'light' ? 'gray.100' : 'dark.focusGray'}
            p="16px"
            borderRadius="8px"
            {...boxProps}
        >
            <Flex align="center" gap="12px">
                <InfoIcon color="purple.500" />
                <Text
                    color={colorMode === 'light' ? 'gray.800' : 'white'}
                    fontSize='14px'
                    lineHeight='24px'
                    fontWeight={400}
                >
                    {message}
                </Text>
            </Flex>
        </Box>
    );
};

export default AlertMessageBox;
