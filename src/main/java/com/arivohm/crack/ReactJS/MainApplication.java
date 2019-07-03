package com.arivohm.crack.ReactJS;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import cl.json.RNSharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import org.wonday.orientation.OrientationPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import cl.json.ShareApplication;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNViewShotPackage(),
            new SplashScreenReactPackage(),
            new RNFetchBlobPackage(),
            new RNSharePackage(),
            new RNDeviceInfo(),
            new GoogleAnalyticsBridgePackage(),
            new FastImageViewPackage(),
            new OrientationPackage(),
            new RNAdMobPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
  
  @Override
  public String getFileProviderAuthority() {
         // ${applicationId} = com.abc (original applicationId from build.gradle)
         return "com.arivohm.crack.ReactJS.provider";
  }
}
