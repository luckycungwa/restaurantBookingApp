import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryChip,
            selectedCategory === category ? styles.selectedCategoryChip : styles.outlinedCategoryChip,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category ? styles.selectedCategoryText : styles.outlinedCategoryText,
            ]}
          >{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 8,
    borderWidth: 1,
  },
  categoryChip: {
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    height: 38,
    minWidth: 100,
  },
  outlinedCategoryChip: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  selectedCategoryChip: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  categoryText: {
    fontWeight: 'bold',
  },
  outlinedCategoryText: {
    color: 'black',
  },
  selectedCategoryText: {
    color: 'white',
  },
});

export default CategoryFilter;
