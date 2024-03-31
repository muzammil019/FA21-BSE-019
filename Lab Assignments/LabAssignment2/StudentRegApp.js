
import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

class StudentRecordApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      studentGPA: '',
      students: [],
      searchName: '',
      searchGPA: '',
      searchResult: null
    };
  }

  addStudentRecord = () => {
    const { studentName, studentGPA, students } = this.state;
    if (studentName && studentGPA) {
      const updatedStudents = [...students, { name: studentName, gpa: parseFloat(studentGPA) }];
      this.setState({ students: updatedStudents, studentName: '', studentGPA: '' });
    } else {
      alert('Please enter student name and GPA.');
    }
  };

  searchStudentRecord = () => {
    const { students, searchName, searchGPA } = this.state;
    const result = students.filter(student => student.name.includes(searchName) && student.gpa.toString().includes(searchGPA));
    this.setState({ searchResult: result });
  };

  clearSearchResult = () => {
    this.setState({ searchName: '', searchGPA: '', searchResult: null });
  };

  renderStudent = ({ item }) => (
    <View style={styles.studentItem}>
      <Text>Name: {item.name}</Text>
      <Text>GPA: {item.gpa}</Text>
    </View>
  );

  render() {
    const { studentName, studentGPA, searchName, searchGPA, searchResult } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Student Record Maintenance</Text>
        <Text style={styles.subHeader}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Name"
          value={studentName}
          onChangeText={text => this.setState({ studentName: text })}
        />
        <Text style={styles.subHeader}>GPA:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Student GPA"
          keyboardType="numeric"
          value={studentGPA}
          onChangeText={text => this.setState({ studentGPA: text })}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Student" onPress={this.addStudentRecord} />
          <Button title="Search Record" onPress={this.searchStudentRecord} />
        </View>
        <Text style={styles.subHeader}>Records</Text>
        {searchResult && (
          <FlatList
            data={searchResult}
            renderItem={this.renderStudent}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Clear Record" onPress={this.clearSearchResult} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    marginBottom:5,
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  studentItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginBottom: 20,
  },
});

export default StudentRecordApp;
