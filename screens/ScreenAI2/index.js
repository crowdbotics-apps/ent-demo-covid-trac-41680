import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DashboardScreen = ({
  params
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.covidtracking.com/v1/states/current.json").then(response => response.json()).then(responseData => {
      setData(responseData[0]);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  if (!data) {
    return <View style={styles.container}>
        <Text>Loading...</Text>
      </View>;
  }

  return <View style={styles.container}>
      <Image source={{
      uri: "https://flagpedia.net/data/us/w1160/ak.webp"
    }} style={styles.image} />
      <Text style={styles.title}>{data.state}</Text>
      <Text style={styles.subtitle}>COVID-19 Dashboard</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Cases</Text>
          <Text style={styles.infoValue}>{data.positive}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Deaths</Text>
          <Text style={styles.infoValue}>{data.death}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Tests</Text>
          <Text style={styles.infoValue}>{data.totalTestResults}</Text>
        </View>
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    marginBottom: 30
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%"
  },
  infoItem: {
    alignItems: "center"
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
export default DashboardScreen;