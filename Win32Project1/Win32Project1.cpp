// Win32Project1.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"


#include "opencv2/core/core.hpp"
#include "opencv2/features2d/features2d.hpp"
#include "opencv2/highgui/highgui.hpp"
//#include "opencv2/nonfree/nonfree.hpp"
//#include "opencv2/legacy/legacy.hpp"
#include "opencv2/xfeatures2d/nonfree.hpp"
//#include "opencv2/legacy/legacy.hpp"
#include "iostream"
#include "time.h"
#include <vector>
using namespace std;
using namespace cv;
using namespace cv::xfeatures2d;
#ifdef DEBUG
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_aruco331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_bioinspired331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_calib3d331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_core331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_dnn331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_features2d331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_flann331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_fuzzy331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_highgui331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_imgcodecs331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_imgproc331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_ml331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_objdetect331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_optflow331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_phase_unwrapping331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_photo331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_plot331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_reg331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_rgbd331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_shape331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_stereo331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_stitching331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_structured_light331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_superres331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_surface_matching331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_video331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_videoio331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_videostab331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_xfeatures2d331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_ximgproc331d.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_xphoto331d.lib")
#else
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_aruco331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_bioinspired331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_calib3d331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_core331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_dnn331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_features2d331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_flann331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_fuzzy331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_highgui331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_imgcodecs331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_imgproc331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_ml331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_objdetect331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_optflow331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_phase_unwrapping331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_photo331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_plot331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_reg331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_rgbd331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_shape331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_stereo331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_stitching331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_structured_light331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_superres331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_surface_matching331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_video331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_videoio331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_videostab331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_xfeatures2d331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_ximgproc331.lib")
#pragma comment(lib, "F:\\opencv\\opencv3.3\\opencv\\newbuild\\install\\x86\\vc14\\lib\\opencv_xphoto331.lib")

#endif // DEBUG



int main()
{
	long time = clock();
	Mat image1 = imread("1.jpg", IMREAD_GRAYSCALE);
	Mat image2 = imread("2.jpg");
	printf("1匹配花费时间%dms\n", clock() - time);
	// 检测surf特征点
	vector<KeyPoint> keypoints1, keypoints2;
	//SurfFeatureDetector detector(700);
	Ptr<SURF> detector = SURF::create(700);
	detector->detect(image1, keypoints1);
	printf("2匹配花费时间%dms\n", clock() - time);
	detector->detect(image2, keypoints2);
	printf("3匹配花费时间%dms\n", clock() - time);
	// 计算特征描述点
	//SurfDescriptorExtractor surfDesc;
	Ptr<SURF> surfDesc = SURF::create();
	Mat descriptros1, descriptros2;
	surfDesc->compute(image1, keypoints1, descriptros1);
	surfDesc->compute(image2, keypoints2, descriptros2);
	printf("4匹配花费时间%dms\n", clock() - time);
	// 计算匹配点数
	//BruteForceMatcher<L2<float>>matcher;
	Ptr<DescriptorMatcher> matcher = DescriptorMatcher::create("BruteForce");
	vector<DMatch> matches;
	matcher->match(descriptros1, descriptros2, matches);//匹配特征向量
													   // 对找到的匹配特征向量进行二分排序,将匹配度强的n个向量放到前面
	printf("5匹配花费时间%dms\n", clock() - time);
	std::nth_element(matches.begin(), matches.begin() + 2, matches.end());
	//matches.erase(matches.begin() + 10, matches.end());//擦除排序在阈值后面的所有匹配点
													  // 画出匹配图
	//Mat imageMatches;
	//drawMatches(image1, keypoints1, image2, keypoints2, matches, imageMatches, Scalar(255, 0, 0));//进行绘制
																								  //获得并打印两张图匹配点的坐标
	//vector<DMatch> ::iterator itor;//容器迭代器  
	//printf("左边图像\n");
	//itor = matches.begin();
	//while (itor != matches.end())
	//{
	//	printf("x:%.2f,y:%.2f\n", keypoints1[itor->queryIdx].pt.x, keypoints1[itor->queryIdx].pt.y);
	//	itor++;
	//}
	//printf("右边图像\n");
	//itor = matches.begin();
	//while (itor != matches.end())
	//{
	//	printf("x:%.2f,y:%.2f\n", keypoints2[itor->trainIdx].pt.x, keypoints2[itor->trainIdx].pt.y);//注意这里用的是trainIdx，其保存着右边图像匹配点的序号，而上边的queryIdx保存着左边图像匹配点的序号
	//	itor++;
	//}
	printf("匹配花费时间%dms\n", clock() - time);
	//imshow("image2", imageMatches);
	waitKey();
	return 0;
}

