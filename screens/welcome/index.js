import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, FlatList, StyleSheet, Pressable } from "react-native";

const Dashboard = ({
  navigation
}) => {
  const [hospitalData, setHospitalData] = useState([]);
  useEffect(() => {
    fetchHospitalData();
  }, []);

  const fetchHospitalData = async () => {
    try {
      const response = await fetch("https://api.covidtracking.com/v1/states/current.json");
      const data = await response.json();
      setHospitalData(data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  const renderItem = ({
    item
  }) => {
    return <Pressable style={styles.item}>
        <Text style={styles.title}>{item.state}</Text>
        <Text style={styles.content}>Hospitalized: {item.hospitalized}</Text>
        <Text style={styles.content}>In ICU: {item.inIcuCurrently}</Text>
        <Text style={styles.content}>
          On Ventilator: {item.onVentilatorCurrently}
        </Text>
      </Pressable>;
  };

  return <SafeAreaView style={styles.container}>
      <FlatList data={hospitalData} renderItem={renderItem} keyExtractor={item => item.state} />
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8"
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  content: {
    fontSize: 18
  }
});
export default Dashboard;