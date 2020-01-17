class PointModel {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.city = data.city;
    this.description = data.description;
    this.pictures = data.pictures;
    this.offers = data.offers;
    this.price = data.price;
    this.isFavored = data.isFavored;
  }

  toRAW() {
    return {
      'base_price': Number(this.price),
      'date_from': this.startTime.toISOString(),
      'date_to': this.endTime.toISOString(),
      'destination': {
        description: this.description,
        name: this.city,
        pictures: this.pictures
      },
      'id': this.id,
      'is_favorite': this.isFavored,
      'offers': this.offers,
      'type': this.type
    };
  }

  static parsePoint(data) {
    return new PointModel({
      id: data[`id`],
      type: data[`type`],
      startTime: new Date(data[`date_from`]),
      endTime: new Date(data[`date_to`]),
      city: data[`destination`][`name`],
      description: data[`destination`][`description`],
      pictures: data[`destination`][`pictures`],
      offers: data[`offers`],
      price: data[`base_price`],
      isFavored: data[`is_favorite`],
    });
  }

  static parsePoints(data) {
    return data.map(PointModel.parsePoint);
  }

  static clone(data) {
    return new PointModel(data);
  }
}

export {
  PointModel as default
};
