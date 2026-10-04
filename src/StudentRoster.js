import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import StudentCard from "./StudentCard";

  { id: "s1", name: "Ana Cruz", course: "IT313", units: 21, isFullLoad: true },
  {
    id: "s2",
    name: "Bea Santos",
    course: "IT313",
    units: 15,
    isFullLoad: false,
  },
  { id: "s3", name: "Cid Ramos", course: "IT313", units: 18, isFullLoad: true },
  {
    id: "s4",
    name: "Dex Alonzo",
    course: "IT313",
    units: 12,
    isFullLoad: false,
  },
];

function StudentRoster() {
  const [roster, setRoster] = useState(students);

  const reverseRoster = () => {
    setRoster((prev) => [...prev].reverse());
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>
        {`${roster.length} students enrolled`}
      </Text>

      <Pressable style={styles.button} onPress={reverseRoster}>
        <Text style={styles.buttonText}>Reverse Order</Text>
      </Pressable>

      <FlatList
        data={roster}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            name={item.name}
            course={item.course}
            units={item.units}
            isFullLoad={item.isFullLoad}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#2f6fed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default StudentRoster;
