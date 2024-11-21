import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Touchable, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { UIActivityIndicator } from "react-native-indicators";
import { FloatingAction } from "react-native-floating-action";
import { useRouter } from 'expo-router';
import { Entypo, Feather } from '@expo/vector-icons';

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<any>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, deadline, description } = params;

  useEffect(() => {
    setTimeout(() => {
      setAssignment({
        title: name,
        description: description,
        deadline: deadline,
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <UIActivityIndicator color="#1e90FF" size={40}/>;
  }

  const Actions = [
    {
      text: "Submit Assignment",
      name: "submit",
      position: 1,
      color: '#1e90FF',
      buttonSize: 60,
      icon: <Feather name='send' size={24} color='#fff' />,
      textStyle: { fontSize: 18, fontWeight: '500' },
    },
    {
      text: "Check Submission",
      name: "check",
      position: 2,
      color: '#1e90FF',
      buttonSize: 60,
      icon: <Entypo name='check' size={24} color='#fff' />,
      textStyle: { fontSize: 18, fontWeight: '500' },
    },
  ];

  const handleAction = (name: string) => {
    const assID = id;
    const assName = name;
    const assDeadline = deadline;

    if (name === 'submit') {
      router.push({ pathname: `/assignments/submit?id:${assID}&name=${assName}&deadline=${assDeadline}` });
    } else if (name === 'check') {
      router.push({ pathname: `/assignments/check?id:${assID}&name=${assName}&deadline=${assDeadline}` });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.title}>{assignment?.title}</Text>
      <Text style={styles.description}>{assignment?.description}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.deadlineTitle}>Deadline: </Text>
      <Text style={styles.deadline}>{assignment?.deadline}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.fileTitle}>Attached File:</Text>
      <Text style={styles.deadline}> 1 File Attached</Text>
      </View>
      <TouchableOpacity
      style={styles.fileButton}
      onPress={() => {
        Alert.alert('Success', 'Downloaded successfully');
      }
      }
        >
        <Text style={styles.fileButtonText}>Download</Text>
      </TouchableOpacity>
      </View>
      <FloatingAction
      actions={Actions}
        onPressItem={name => {
          if (name) {
            handleAction(name);
          }
        }}
        position='right'
        color='#1e90FF'
        buttonSize={80}
        floatingIcon={<Feather name='plus' size={30} color='#fff' />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  deadline: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  deadlineTitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    fontWeight: 'bold',
  },
  fileTitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    fontWeight: 'bold',
  },
  fileButton: {
    backgroundColor: '#1e90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Details;
