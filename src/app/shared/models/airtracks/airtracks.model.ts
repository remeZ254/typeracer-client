export enum AirTracks {
  adir = 'adir',
  baz = 'baz',
}

export const getTrackIcon = (airTrack: AirTracks): string => `assets/svg/airtracks/${airTrack}.svg`;
