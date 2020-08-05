import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Button } from "./common";

// Instad of 'time checked in' input, make it a new Date() to get the current time
function AddPartyForm(): JSX.Element {
  const [name, updateName] = useState("");
  const [partySize, updatePartySize] = useState(""); // numOfGuests instead?
  const [estWait, updateEstWait] = useState("");
  const [notes, updateNotes] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: "purple" }]}>
      <Text style={styles.title}>Get the party's info...</Text>
      <View style={{ flexDirection: "row" }}>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={updateName}
          style={styles.nameInput}
        />
        <Input
          placeholder="# Guests"
          keyboardType="number-pad"
          value={partySize}
          onChangeText={updatePartySize}
          style={styles.guestCountInput}
        />
      </View>

      <Input
        placeholder="How long will their wait be?"
        value={estWait}
        onChangeText={updateEstWait}
      />
      <Input
        placeholder="Notes"
        value={notes}
        onChangeText={updateNotes}
        style={styles.notesInput}
        multiline
        editable
        maxLength={400}
        numberOfLines={4}
      />
      <Button onPress={() => {}} text="Add to Waitlist" />
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  // TODO: share common styles and/or metrics... make padding a shared screen option?
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "pink",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },

  nameInput: { width: "75%" },
  guestCountInput: { width: "25%", marginLeft: 1 },
  notesInput: { textAlignVertical: "top" },
});

export default AddPartyForm;
