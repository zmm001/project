�}S� r T  �U�F�9-��a	��S��_B�v����3�+��s������3r�Q�u��Gq�X�?8
�����8�A���P�p -��v#7�)Ј|����&#���η�5M��V�i�ﷺ�6��tOa}�{�[
�-�a%�)8f�Ḥ�C� (�N~�`5�2����7�����|pV�׸&��Pg)�3&@Ԍ�*�@[��'H*
��M��Ǘ\Lb�{�X[hT��rKQj=ӈI�5����ֳ�Ga0I��}y���	�zxԭ+�2��
�A�'�ON>K��T���%��D':�D�c'm~�Z��<��=Qb���T(=?0�T=;�׉=:@����������%�n��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l(ʹ��_�6r���TTU��ǂJ���`FGO�H.�#e}�CC=���3���A�B؇�����܁GL�����q-U�T0 )vnxcBp(T�p{@0�Rsq����p�@��(�TG�~)w��w��Z���-�ٝٱ���4K�|�S]�i����E�
4��8��������;��:v��O�}68��g9N\	�O�Ĕ5�e�qC����K26:D�T�04�Y�ʨdc��܄11OOTx��y<�챳1��7����3<������;s�8k*v�(L<
�&c��NU�i�N4��z1�M�~��w7�t�Lúٍ��Sq��*���n[��w�B�)W��w@n-��t�7r.��c3�1UyD��pپ��yO�>�۶�$���T��޾�a������ n>�����(73�g���*j���g�h'	��G%kn��%E��o V��;�u7������@�����0��#����R۸���M�Zp!�g�Y�l��or(object sender, EventArgs e)
        {
            Exception ex = HttpContext.Current.Server.GetLastError();
            string ip = HttpContext.Current.Request.UserHostAddress;
            string url = HttpContext.Current.Request.Url.ToString();
            LogOperate.WriteErrorLog("客户机IP:" + ip + "\r\n错误地址:" + url + "\r\n异常信息:" + Server.GetLastError().Message + "", ex);
        }
    }
}