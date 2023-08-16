import React, { useState } from 'react';
import { View, Text } from 'react-native';

const ErrorBoundary = (props) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const [errorInfo, setErrorInfo] = useState('');

    const handleCatchError = (error, errorInfo) => {
        console.log('Error: ' + error);
        console.log('Error Info: ' + JSON.stringify(errorInfo));

        setHasError(true);
        setError(error);
        setErrorInfo(errorInfo);
    };

    if (hasError) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>Oops!!! Something went wrong..</Text>
                <Text>Error: {error.toString()}</Text>
                <Text>Error Info: {JSON.stringify(errorInfo)}</Text>
            </View>
        );
    }

    return (
        <React.Fragment>
            {React.Children.map(props.children, (child) =>
                React.cloneElement(child, {
                    onError: handleCatchError, // Pass the error handling function to children
                })
            )}
        </React.Fragment>
    );
};

export default ErrorBoundary;