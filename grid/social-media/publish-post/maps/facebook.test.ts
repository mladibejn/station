import { RecordingDefinitions } from '@superfaceai/testing';
import { env } from 'process';

import { publishPostTest } from './publish-post';

const PAGE_ACCESS_TOKEN_REDACTED_VALUE = 'PAGE_ACCESS_TOKEN_VALUE_REDACTED';

const beforeRecordingSave = function (recordings: RecordingDefinitions) {
  let pageAccessToken: string | undefined;

  recordings.forEach(recording => {
    if (pageAccessToken) {
      recording.path = recording.path.replace(
        pageAccessToken,
        PAGE_ACCESS_TOKEN_REDACTED_VALUE
      );
    }
    if (recording.response) {
      const response = recording.response as { access_token?: string };
      if (response.access_token) {
        pageAccessToken = response.access_token;
        recording.response = {
          ...response,
          access_token: PAGE_ACCESS_TOKEN_REDACTED_VALUE,
        };
      }
    }
  });
};

const beforeRecordingLoad = function (recordings: RecordingDefinitions) {
  recordings.forEach(recording => {
    recording.path.replace(
      PAGE_ACCESS_TOKEN_REDACTED_VALUE,
      env.FACEBOOK_ACCESS_TOKEN || 'xxx'
    );
  });
};

publishPostTest('facebook', {
  beforeRecordingSave,
  beforeRecordingLoad,
});
