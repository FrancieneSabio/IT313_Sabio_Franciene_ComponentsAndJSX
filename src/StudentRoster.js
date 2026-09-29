import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import StudentCard from "./StudentCard";

// Starter data, as given in the lab. In a bigger app this would live
// in its own data file, but a small array like this is fine inline.
const students = [
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

  // Simple handler to reverse the roster order — used below to
  // demonstrate the difference between keying by index vs by id.
  const reverseRoster = () => {
    setRoster((prev) => [...prev].reverse());
  };

  return (
    // Single root element wrapping the header and the list, as required.
    <View style={styles.container}>
      <Text style={styles.header}>
        {/* JSX expression computed from the array, built with a
            template literal — not hard-coded. */}
        {`${roster.length} students enrolled`}
      </Text>

      <Pressable style={styles.button} onPress={reverseRoster}>
        <Text style={styles.buttonText}>Reverse Order</Text>
      </Pressable>

      <FlatList
        data={roster}
        // Correct approach: key by the stable, unique student.id.
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard
            name={item.name}
            course={item.course}
            units={item.units}
            isFullLoad={item.isFullLoad}
          />
        )}

        /*
         * --- Array-index-as-key experiment (Requirement 6) ---
         * Temporarily swap the two lines above for these two to see
         * the problem:
         *
         *   keyExtractor={(item, index) => index.toString()}
         *   renderItem={({ item, index }) => ( ... same StudentCard ... )}
         *
         * With index-based keys, when you press "Reverse Order",
         * React sees the same keys (0, 1, 2, 3) in the same
         * positions and assumes the *components* haven't changed —
         * it just re-renders any INTERNAL state at those slots
         * (e.g. a per-card expanded/collapsed toggle, if you add
         * one) instead of associating it with the *student* it
         * originally belonged to. The card's own text props (name,
         * units) still update correctly here because StudentCard
         * has no internal state — but the moment a card has its own
         * state, that state gets left behind on the wrong data as
         * items reorder. Using student.id fixes this because each
         * key stays attached to the same logical student wherever
         * it moves in the list.
         */
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
