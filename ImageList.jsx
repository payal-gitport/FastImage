import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import FastImage from 'react-native-fast-image';
// import LinearGradient from 'react-native-linear-gradient';

const ImageList = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetchData();
  }, []);

  // eslint-disable-next-line no-undef
  fetchData = async () => {
    setIsLoading(true);
    axios
      .get(
        'https://rss.applemarketingtools.com/api/v2/us/music/most-played/100/albums.json',
      )
      .then(function (response) {
        setData(response.data.feed);
        setIsLoading(false);
        // console.log(response.data.feed.results[0].url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return isLoading ? (
    <ActivityIndicator style={styles.activityContainer} />
  ) : (
    <View style={styles.mainContainer}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          paddingLeft: 24,
          paddingBottom: 10,
          fontSize: 22,
          fontWeight: 600,
        }}>
        {data.title}
      </Text>
      {/* <Text>{data.results[0].artistName}</Text> */}
      <ScrollView>
        <View style={styles.listContainer}>
          {data.results.map((item, index) => (
            <View style={styles.listItem} key={index}>
              <View style={styles.gradientContainer}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listText}>{item.artistName}</Text>
              </View>
              <Image
                style={styles.image}
                source={{
                  uri: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/56/45/46/5645464b-7fad-b6ea-6c15-9dbf754a8d83/23UMGIM68667.rgb.jpg/100x100bb.jpg',
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  listItem: {
    marginVertical: 5,
  },
  listTitle: {
    zIndex: 2,
    position: 'absolute',
    bottom: 25,
    color: 'white',
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    opacity: 1.0,
  },
  listText: {
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  gradientContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 160,
    height: 160,
    borderRadius: 25,
    zIndex: 2,
    position: 'absolute',
  },
  image: {
    zIndex: 1,
    width: 160,
    height: 160,
    borderRadius: 25,
  },
});
